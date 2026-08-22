import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  Grid,
  List,
  Edit2,
  Trash2,
  Eye,
  Sparkles,
  ExternalLink,
  Barcode,
  Layers,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';
import { BarcodeSvg } from '../common/BarcodeSvg';
import { lookupIsbnMetadata } from '../../services/openLibraryApi';

export function CatalogTab() {
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
    isAddBookOpen,
    setIsAddBookOpen,
    globalSearchQuery,
    showToast
  } = useLibrary();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Modals state
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  // Add Book Form state
  const [newBookIsbn, setNewBookIsbn] = useState('');
  const [isFetchingIsbn, setIsFetchingIsbn] = useState(false);
  const [addFormData, setAddFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Computer Science',
    shelfLocation: 'CS-A1-01',
    deweyCode: '005.1',
    totalCopies: 5,
    publisher: 'Academic Press',
    publishYear: 2024,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    description: ''
  });

  // Effective search query (combines local search and topbar global search)
  const effectiveQuery = (searchQuery || globalSearchQuery || '').toLowerCase();

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesQuery =
        !effectiveQuery ||
        book.title.toLowerCase().includes(effectiveQuery) ||
        book.author.toLowerCase().includes(effectiveQuery) ||
        book.isbn.toLowerCase().includes(effectiveQuery) ||
        book.category.toLowerCase().includes(effectiveQuery) ||
        book.shelfLocation.toLowerCase().includes(effectiveQuery);

      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;

      const matchesAvailability =
        selectedAvailability === 'All'
          ? true
          : selectedAvailability === 'in_stock'
          ? book.availableCopies > 0
          : book.availableCopies === 0;

      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [books, effectiveQuery, selectedCategory, selectedAvailability]);

  // Categories list
  const categories = ['All', 'Computer Science', 'Artificial Intelligence', 'Business & Innovation', 'Medical & Neuroscience', 'Physics & Computing'];

  // Handle ISBN Auto-fetch inside Add Book Modal
  const handleAutoFetchIsbn = async () => {
    if (!newBookIsbn) {
      showToast('Please enter an ISBN first', 'warning');
      return;
    }
    setIsFetchingIsbn(true);
    try {
      const data = await lookupIsbnMetadata(newBookIsbn);
      setAddFormData(prev => ({
        ...prev,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        publisher: data.publisher,
        publishYear: data.publishYear,
        category: data.category || prev.category,
        deweyCode: data.deweyCode || prev.deweyCode,
        coverUrl: data.coverUrl || prev.coverUrl,
        description: data.description || prev.description
      }));
      showToast(`Auto-filled metadata for "${data.title}"`, 'success');
    } catch (err) {
      showToast('Could not resolve ISBN', 'error');
    } finally {
      setIsFetchingIsbn(false);
    }
  };

  const handleCreateBookSubmit = async (e) => {
    e.preventDefault();
    if (!addFormData.title || !addFormData.author) {
      showToast('Title and Author are required', 'warning');
      return;
    }
    await addBook(addFormData);
    setIsAddBookOpen(false);
    setAddFormData({
      title: '',
      author: '',
      isbn: '',
      category: 'Computer Science',
      shelfLocation: 'CS-A1-01',
      deweyCode: '005.1',
      totalCopies: 5,
      publisher: 'Academic Press',
      publishYear: 2024,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      description: ''
    });
    setNewBookIsbn('');
  };

  const handleUpdateBookSubmit = async (e) => {
    e.preventDefault();
    if (!editingBook) return;
    await updateBook(editingBook.id, editingBook);
    setEditingBook(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Book Catalog & Inventory
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Manage {books.length} unique titles across institutional campus shelves.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Grid / Table View Switcher */}
          <div className="flex items-center rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                  : 'text-surface-400 hover:text-surface-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                  : 'text-surface-400 hover:text-surface-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="gradient"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddBookOpen(true)}
            className="font-bold shadow-sm"
          >
            Add New Title
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter by title, author, ISBN barcode, or Dewey classification..."
            />
          </div>

          {/* Availability filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-2.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-semibold text-surface-700 dark:text-surface-200"
            >
              <option value="All">All Stock Status</option>
              <option value="in_stock">Available Copies &gt; 0</option>
              <option value="out_of_stock">Out of Stock (0 Available)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-surface-400 font-semibold uppercase tracking-wider text-[10px] shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white font-bold shadow-sm'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Content Rendering */}
      {filteredBooks.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No catalog records match your query"
          description="Try clearing your search keyword or switching category filter tabs."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedAvailability('All');
          }}
        />
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              {/* Cover & Badges */}
              <div className="relative h-48 bg-surface-100 dark:bg-surface-950 overflow-hidden">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="default" size="sm" className="bg-surface-900/80 text-white border-white/20 backdrop-blur-md">
                    {book.shelfLocation}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <StatusBadge status={book.availableCopies > 0 ? 'available' : 'borrowed'} />
                </div>
              </div>

              {/* Book Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-surface-400 font-mono mb-1">
                    <span>Dewey: {book.deweyCode}</span>
                    <span>★ {book.rating}</span>
                  </div>

                  <h3 className="font-bold text-sm text-surface-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 line-clamp-1">
                    By {book.author}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-100 dark:border-surface-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-surface-400 uppercase font-semibold block">
                      Availability
                    </span>
                    <span className="font-mono text-xs font-bold text-surface-900 dark:text-white">
                      {book.availableCopies} / {book.totalCopies} Copies
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedBookDetail(book)}
                      className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800"
                      title="View Details & Barcode"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingBook(book)}
                      className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800"
                      title="Edit Book"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="p-1.5 rounded-lg text-surface-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                      title="Delete Book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 dark:bg-surface-950 text-surface-500 font-mono uppercase border-b border-surface-200 dark:border-surface-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">Book Title & Author</th>
                <th className="py-3.5 px-4 font-bold">ISBN / Dewey</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Shelf</th>
                <th className="py-3.5 px-4 font-bold">Copies</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-8 h-12 object-cover rounded shadow-sm shrink-0"
                      />
                      <div>
                        <span className="font-bold text-surface-900 dark:text-white block">
                          {book.title}
                        </span>
                        <span className="text-surface-500 text-[11px]">
                          {book.author} ({book.publishYear})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <div>{book.isbn}</div>
                    <div className="text-surface-400 text-[10px]">Dewey {book.deweyCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="default" size="sm">
                      {book.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                    {book.shelfLocation}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={book.availableCopies > 0 ? 'available' : 'borrowed'} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedBookDetail(book)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingBook(book)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL 1: ADD BOOK (WITH ISBN AUTO-FETCH) */}
      <Modal
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        title="Add New Book to Catalog"
        subtitle="Type an ISBN to auto-fill metadata from OpenLibrary or enter manually."
      >
        <form onSubmit={handleCreateBookSubmit} className="space-y-4">
          {/* ISBN Auto-lookup field */}
          <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 mb-1.5">
              ⚡ Quick ISBN Auto-Fetcher
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBookIsbn}
                onChange={(e) => setNewBookIsbn(e.target.value)}
                placeholder="e.g. 978-0132350884"
                className="flex-1 px-3 py-2 bg-white dark:bg-surface-900 border border-brand-300 dark:border-brand-700 rounded-lg text-xs font-mono"
              />
              <Button
                type="button"
                variant="primary"
                size="sm"
                isLoading={isFetchingIsbn}
                onClick={handleAutoFetchIsbn}
              >
                Auto-fill
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={addFormData.title}
                onChange={(e) => setAddFormData({ ...addFormData, title: e.target.value })}
                placeholder="e.g. Computer Networks"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Author(s) *
              </label>
              <input
                type="text"
                required
                value={addFormData.author}
                onChange={(e) => setAddFormData({ ...addFormData, author: e.target.value })}
                placeholder="e.g. Andrew S. Tanenbaum"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Category
              </label>
              <select
                value={addFormData.category}
                onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Shelf Location
              </label>
              <input
                type="text"
                value={addFormData.shelfLocation}
                onChange={(e) => setAddFormData({ ...addFormData, shelfLocation: e.target.value })}
                placeholder="e.g. CS-B2-08"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Total Copies
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={addFormData.totalCopies}
                onChange={(e) => setAddFormData({ ...addFormData, totalCopies: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              value={addFormData.coverUrl}
              onChange={(e) => setAddFormData({ ...addFormData, coverUrl: e.target.value })}
              className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
              Description / Abstract
            </label>
            <textarea
              rows="3"
              value={addFormData.description}
              onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
              placeholder="Brief overview of the book contents..."
              className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddBookOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="font-bold"
            >
              Save Book to Catalog
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: EDIT BOOK */}
      {editingBook && (
        <Modal
          isOpen={true}
          onClose={() => setEditingBook(null)}
          title={`Edit "${editingBook.title}"`}
        >
          <form onSubmit={handleUpdateBookSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-surface-500 mb-1">Title</label>
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-500 mb-1">Author</label>
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-surface-500 mb-1">Shelf Location</label>
                <input
                  type="text"
                  value={editingBook.shelfLocation}
                  onChange={(e) => setEditingBook({ ...editingBook, shelfLocation: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-500 mb-1">Total Copies</label>
                <input
                  type="number"
                  min="1"
                  value={editingBook.totalCopies}
                  onChange={(e) => setEditingBook({ ...editingBook, totalCopies: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-500 mb-1">Available Copies</label>
                <input
                  type="number"
                  min="0"
                  max={editingBook.totalCopies}
                  value={editingBook.availableCopies}
                  onChange={(e) => setEditingBook({ ...editingBook, availableCopies: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
              <Button type="button" variant="secondary" size="sm" onClick={() => setEditingBook(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="font-bold">
                Update Catalog Record
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 3: BOOK DETAILS WITH BARCODE */}
      {selectedBookDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBookDetail(null)}
          title="Catalog Record Specification"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedBookDetail.coverUrl}
                alt={selectedBookDetail.title}
                className="w-32 h-48 object-cover rounded-xl shadow-lg shrink-0 border border-surface-200 dark:border-surface-700"
              />

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{selectedBookDetail.category}</Badge>
                  <StatusBadge status={selectedBookDetail.availableCopies > 0 ? 'available' : 'borrowed'} />
                </div>

                <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                  {selectedBookDetail.title}
                </h3>
                <p className="text-xs text-surface-600 dark:text-surface-400">
                  By <span className="font-bold">{selectedBookDetail.author}</span> • {selectedBookDetail.publisher} ({selectedBookDetail.publishYear})
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800">
                    <span className="text-surface-400 block text-[10px] uppercase font-bold">Shelf Index</span>
                    <span className="font-mono font-bold text-brand-600">{selectedBookDetail.shelfLocation}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800">
                    <span className="text-surface-400 block text-[10px] uppercase font-bold">Dewey Decimal</span>
                    <span className="font-mono font-bold text-surface-900 dark:text-white">{selectedBookDetail.deweyCode}</span>
                  </div>
                </div>

                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed pt-1">
                  {selectedBookDetail.description}
                </p>
              </div>
            </div>

            {/* Generated Barcode Display */}
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase text-surface-400 mb-2 font-bold">
                PHYSICAL RFID / BARCODE ASSET TAG
              </span>
              <BarcodeSvg value={selectedBookDetail.isbn} height={40} className="w-full max-w-sm" />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedBookDetail(null)}
              >
                Close Detail
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}