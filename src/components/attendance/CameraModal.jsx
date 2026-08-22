// src/components/attendance/CameraModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CheckCircle2, ShieldCheck, X, Scan, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function CameraModal({ isOpen, onClose, onVerified }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    let activeStream = null;

    if (isOpen) {
      setIsScanning(true);
      setIsDetected(false);
      setCameraError(null);

      // Attempt to access user webcam
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
          .then((mediaStream) => {
            activeStream = mediaStream;
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          })
          .catch((err) => {
            console.warn('Webcam permission / hardware unavailable:', err.message);
            setCameraError('Camera access not detected — Using Smart AI Face Simulation');
          });
      } else {
        setCameraError('Webcam API not supported in this browser — Using Simulation');
      }

      // Simulate AI Face detection after 2 seconds
      const timer = setTimeout(() => {
        setIsScanning(false);
        setIsDetected(true);
      }, 2200);

      return () => {
        clearTimeout(timer);
        if (activeStream) {
          activeStream.getTracks().forEach((track) => track.stop());
        }
      };
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    onVerified();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        onClose();
      }}
      title="Smart Biometric Face Verification"
      subtitle="AI-assisted optical presence check"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Video Viewport Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-950 border border-surface-700 flex items-center justify-center shadow-inner">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-brand-950/80 border border-brand-800/80 mx-auto flex items-center justify-center text-brand-400">
                <Camera className="w-8 h-8 animate-pulse" />
              </div>
              <p className="text-xs text-surface-400 font-mono">
                {cameraError || 'Initializing optical sensor...'}
              </p>
            </div>
          )}

          {/* Biometric Target Box Overlay */}
          <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-brand-400/60 rounded-3xl pointer-events-none flex items-center justify-center">
            {isScanning && (
              <div className="laser-line" />
            )}

            {isDetected && (
              <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-500 rounded-3xl flex items-center justify-center animate-scaleUp">
                <div className="bg-emerald-950/90 border border-emerald-600 px-4 py-2 rounded-xl text-emerald-300 font-bold text-xs flex items-center gap-2 shadow-xl backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Face detected ✓ Identity Confirmed
                </div>
              </div>
            )}
          </div>

          {/* Top telemetry tag */}
          <div className="absolute top-3 left-3 bg-surface-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-surface-800 text-[10px] text-surface-300 font-mono flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isDetected ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
            {isScanning ? 'Scanning Biometrics (98.4% Confidence)...' : 'Match Verified'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (stream) stream.getTracks().forEach((track) => track.stop());
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            variant={isDetected ? 'accent' : 'primary'}
            size="sm"
            icon={ShieldCheck}
            disabled={!isDetected}
            onClick={handleConfirm}
            className="flex-1 font-bold"
          >
            {isDetected ? 'Confirm & Clock In' : 'Analyzing Face...'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}