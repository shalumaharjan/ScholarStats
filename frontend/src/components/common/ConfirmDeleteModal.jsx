import { Trash2 } from "lucide-react";

function DeleteConfirmModal({
  isOpen,
  title,
  message,
  itemName,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={26} />
        </div>

        <h3 className="mt-4 text-center font-raleway text-xl font-extrabold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-center font-voces text-sm leading-6 text-secondary">
          {message}{" "}
          <span className="font-bold text-gray-800">{itemName} ?</span>
        </p>

        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3">
          <p className="font-voces text-sm text-red-700">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="rounded-lg bg-gray-100 px-4 py-2.5 font-raleway text-sm font-bold text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-raleway text-sm font-bold text-white hover:bg-red-700"
          >
            <Trash2 size={15} />

            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
