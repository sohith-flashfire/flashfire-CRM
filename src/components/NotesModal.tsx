import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (notes: string) => Promise<void>;
    initialNotes?: string;
    clientName: string;
}

export default function NotesModal({ isOpen, onClose, onSave, initialNotes = '', clientName }: NotesModalProps) {
    const [notes, setNotes] = useState(initialNotes);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setNotes(initialNotes || '');
    }, [initialNotes, isOpen]);

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(notes);
            onClose();
        } catch (error) {
            console.error('Failed to save notes:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Meeting Notes</h3>
                        <p className="text-sm text-slate-500">For {clientName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-lg transition text-slate-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter meeting notes, concerns, or any important details..."
                        className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-slate-700"
                        autoFocus
                    />
                </div>

                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-70"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Notes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
