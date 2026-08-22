import {
  INITIAL_BOOKS,
  INITIAL_MEMBERS,
  INITIAL_LOANS,
  INITIAL_FINES,
  INITIAL_NOTIFICATIONS
} from './mockData';

const STORAGE_KEYS = {
  BOOKS: 'libflow_books_v1',
  MEMBERS: 'libflow_members_v1',
  LOANS: 'libflow_loans_v1',
  FINES: 'libflow_fines_v1',
  NOTIFICATIONS: 'libflow_notifications_v1',
  API_CONFIG: 'libflow_api_config_v1'
};

// Helper for simulating async network latency (150ms)
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

function loadStorage(key, initialFallback) {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn(`Failed to parse storage for ${key}`, e);
  }
  localStorage.setItem(key, JSON.stringify(initialFallback));
  return initialFallback;
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save storage for ${key}`, e);
  }
}

export const mockLibraryApi = {
  // Reset all data to default mock state
  async resetAll() {
    await delay(100);
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(INITIAL_BOOKS));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(INITIAL_LOANS));
    localStorage.setItem(STORAGE_KEYS.FINES, JSON.stringify(INITIAL_FINES));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    return { success: true };
  },

  // ===== BOOKS =====
  async getBooks() {
    await delay();
    return loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
  },

  async addBook(bookData) {
    await delay();
    const books = loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
    const newBook = {
      ...bookData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      availableCopies: Number(bookData.totalCopies || 1),
      totalCopies: Number(bookData.totalCopies || 1),
      rating: 4.8,
      tags: bookData.tags || ['Cataloged']
    };
    books.unshift(newBook);
    saveStorage(STORAGE_KEYS.BOOKS, books);
    return newBook;
  },

  async updateBook(id, bookData) {
    await delay();
    const books = loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Book not found');
    books[index] = { ...books[index], ...bookData };
    saveStorage(STORAGE_KEYS.BOOKS, books);
    return books[index];
  },

  async deleteBook(id) {
    await delay();
    const books = loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
    const filtered = books.filter(b => b.id !== id);
    saveStorage(STORAGE_KEYS.BOOKS, filtered);
    return { success: true, id };
  },

  // ===== MEMBERS =====
  async getMembers() {
    await delay();
    return loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
  },

  async addMember(memberData) {
    await delay();
    const members = loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const newMember = {
      ...memberData,
      id: `MEM-${Math.floor(8000 + Math.random() * 1000)}`,
      activeLoansCount: 0,
      finesBalance: 0,
      joinDate: new Date().toISOString().split('T')[0],
      rfidTag: `RFID-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
      avatar: memberData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    };
    members.unshift(newMember);
    saveStorage(STORAGE_KEYS.MEMBERS, members);
    return newMember;
  },

  // ===== CIRCULATION / LOANS =====
  async getLoans() {
    await delay();
    return loadStorage(STORAGE_KEYS.LOANS, INITIAL_LOANS);
  },

  async issueBook({ bookId, patronId, returnDays = 14 }) {
    await delay();
    const books = loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
    const members = loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const loans = loadStorage(STORAGE_KEYS.LOANS, INITIAL_LOANS);

    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error('Book not found.');
    if (book.availableCopies <= 0) throw new Error(`No available copies left for "${book.title}".`);

    const member = members.find(m => m.id === patronId);
    if (!member) throw new Error('Patron member not found.');
    if (member.activeLoansCount >= (member.maxLoans || 5)) {
      throw new Error(`Patron ${member.name} has reached maximum loan limit (${member.maxLoans}).`);
    }

    // Decrement available copies
    book.availableCopies -= 1;
    saveStorage(STORAGE_KEYS.BOOKS, books);

    // Increment member loan count
    member.activeLoansCount = (member.activeLoansCount || 0) + 1;
    saveStorage(STORAGE_KEYS.MEMBERS, members);

    // Calculate dates
    const now = new Date();
    const issueDate = now.toISOString().split('T')[0];
    const due = new Date();
    due.setDate(now.getDate() + Number(returnDays));
    const dueDate = due.toISOString().split('T')[0];

    const newLoan = {
      id: `LN-${Math.floor(500 + Math.random() * 500)}`,
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverUrl,
      patronId: member.id,
      patronName: member.name,
      patronEmail: member.email,
      issueDate,
      dueDate,
      returnDate: null,
      status: 'active',
      fineAmount: 0,
      renewCount: 0
    };

    loans.unshift(newLoan);
    saveStorage(STORAGE_KEYS.LOANS, loans);

    return newLoan;
  },

  async returnBook({ loanId, condition = 'Good', damageFine = 0 }) {
    await delay();
    const loans = loadStorage(STORAGE_KEYS.LOANS, INITIAL_LOANS);
    const books = loadStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
    const members = loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const fines = loadStorage(STORAGE_KEYS.FINES, INITIAL_FINES);

    const loan = loans.find(l => l.id === loanId);
    if (!loan) throw new Error('Loan transaction record not found.');
    if (loan.status === 'returned') throw new Error('This book has already been returned.');

    // Calculate overdue fine if any
    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    let calculatedFine = Number(damageFine) || 0;

    if (today > dueDate) {
      const diffTime = Math.abs(today - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      calculatedFine += diffDays * 0.75; // $0.75 per day
    }

    loan.returnDate = today.toISOString().split('T')[0];
    loan.status = 'returned';
    loan.fineAmount = calculatedFine;
    saveStorage(STORAGE_KEYS.LOANS, loans);

    // Increment book stock
    const book = books.find(b => b.id === loan.bookId);
    if (book) {
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
      saveStorage(STORAGE_KEYS.BOOKS, books);
    }

    // Decrement member active loan count
    const member = members.find(m => m.id === loan.patronId);
    if (member) {
      member.activeLoansCount = Math.max(0, (member.activeLoansCount || 1) - 1);
      if (calculatedFine > 0) {
        member.finesBalance = (member.finesBalance || 0) + calculatedFine;
      }
      saveStorage(STORAGE_KEYS.MEMBERS, members);
    }

    // Record Fine if applicable
    if (calculatedFine > 0) {
      const newFine = {
        id: `FN-${Math.floor(900 + Math.random() * 100)}`,
        loanId: loan.id,
        patronId: loan.patronId,
        patronName: loan.patronName,
        bookTitle: loan.bookTitle,
        amount: Number(calculatedFine.toFixed(2)),
        reason: condition !== 'Good' ? `Damage/Wear (${condition}) + Overdue` : 'Overdue Return Fee',
        date: today.toISOString().split('T')[0],
        status: 'pending'
      };
      fines.unshift(newFine);
      saveStorage(STORAGE_KEYS.FINES, fines);
    }

    return { loan, fine: calculatedFine };
  },

  async renewBook(loanId) {
    await delay();
    const loans = loadStorage(STORAGE_KEYS.LOANS, INITIAL_LOANS);
    const loan = loans.find(l => l.id === loanId);
    if (!loan) throw new Error('Loan not found');
    if (loan.status === 'returned') throw new Error('Cannot renew an already returned book.');
    if (loan.renewCount >= 2) throw new Error('Maximum renewal limit reached (2/2 renewals used).');

    const currentDue = new Date(loan.dueDate);
    currentDue.setDate(currentDue.getDate() + 14); // extend 14 days
    loan.dueDate = currentDue.toISOString().split('T')[0];
    loan.renewCount = (loan.renewCount || 0) + 1;
    loan.status = 'active';
    saveStorage(STORAGE_KEYS.LOANS, loans);
    return loan;
  },

  // ===== FINES =====
  async getFines() {
    await delay();
    return loadStorage(STORAGE_KEYS.FINES, INITIAL_FINES);
  },

  async settleFine(fineId) {
    await delay();
    const fines = loadStorage(STORAGE_KEYS.FINES, INITIAL_FINES);
    const members = loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const fine = fines.find(f => f.id === fineId);
    if (!fine) throw new Error('Fine not found');

    fine.status = 'paid';
    saveStorage(STORAGE_KEYS.FINES, fines);

    const member = members.find(m => m.id === fine.patronId);
    if (member) {
      member.finesBalance = Math.max(0, (member.finesBalance || 0) - fine.amount);
      saveStorage(STORAGE_KEYS.MEMBERS, members);
    }
    return fine;
  },

  async waiveFine(fineId, reason = 'Academic Grace Period') {
    await delay();
    const fines = loadStorage(STORAGE_KEYS.FINES, INITIAL_FINES);
    const members = loadStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const fine = fines.find(f => f.id === fineId);
    if (!fine) throw new Error('Fine not found');

    fine.status = 'waived';
    fine.waiveReason = reason;
    saveStorage(STORAGE_KEYS.FINES, fines);

    const member = members.find(m => m.id === fine.patronId);
    if (member) {
      member.finesBalance = Math.max(0, (member.finesBalance || 0) - fine.amount);
      saveStorage(STORAGE_KEYS.MEMBERS, members);
    }
    return fine;
  },

  // ===== NOTIFICATIONS =====
  async getNotifications() {
    await delay();
    return loadStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  async addNotification(item) {
    const notifications = loadStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif = {
      id: `NT-${Date.now()}`,
      title: item.title,
      message: item.message,
      timestamp: 'Just now',
      type: item.type || 'info',
      read: false
    };
    notifications.unshift(newNotif);
    saveStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return newNotif;
  }
};