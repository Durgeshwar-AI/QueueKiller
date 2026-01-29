interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">QueueKiller Demo</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-white text-center">
            Video demo would be embedded here
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
