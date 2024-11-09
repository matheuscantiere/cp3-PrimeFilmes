export default function CardContainer({ titulo, children }) {
    return (
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-white">{titulo}</h1>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {children}
        </div>
      </div>
    );
}