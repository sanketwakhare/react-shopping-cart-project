import "./no-items-overlay.scss";

const NoItemsOverlay = () => {
  return (
    <div className="no-items-container">
      <div>It seems there are no products that match your criteria.</div>
      <div>Feel free to explore other categories.</div>
    </div>
  );
};

export default NoItemsOverlay;
