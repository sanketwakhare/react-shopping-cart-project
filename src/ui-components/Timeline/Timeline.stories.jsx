import "./timeline.scss"; // CSS for styling

const TimelineVanilla = () => {
  return (
    <div class="timeline-container">
      <ul class="ul-container">
        <li class="list-item">
          <div class="left-content">12:10 PM</div>
          <div class="right-content">
            <div class="icon">
              <i className="fa fa-check-circle icon-completed"></i>
            </div>
            <div>
              <div>Order placed</div>
              <div>sub content here</div>
              <div>sub content here</div>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-content">12:10 PM</div>
          <div class="right-content">
            <div class="icon">
              <i className="fa fa-check-circle icon-completed"></i>
            </div>
            <div>
              <div>Ready for shipment</div>
              <div>sub content here</div>
              <div>sub content here</div>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-content">12:10 PM</div>
          <div class="right-content">
            <div className="icon">
              <i className="fa fa-check-circle icon-completed"></i>
            </div>
            <div>
              <div>Shipped</div>
              <div>sub content here</div>
              <div>sub content here</div>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-content">05:30 PM</div>
          <div class="right-content">
            <div class="icon">
              <i className="fa fa-clock-four icon-active"></i>
            </div>
            <div>
              <div>Out for Delivery</div>
              <div>Test</div>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-content">05:30 PM</div>
          <div class="right-content pending">
            <div className="icon icon-plain">
              {/* <i className="fa fa-circle icon-pending"></i> */}
            </div>
            <div>
              <div>Delivered</div>
              <div>Test</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TimelineVanilla;
