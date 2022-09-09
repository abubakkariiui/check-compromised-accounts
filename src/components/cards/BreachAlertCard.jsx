import React from "react";

export default function BreachAlertCard(props) {
  if (!props.suggestPasswordChange || props.breaches.length === 0) {
    return (
      <div className="card mb-3">
        <div className="card-header">Alerts</div>
        <div className="card-body">
          <p className="card-text">
            No alerts
            <br />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-warning mb-3">
      <div className="card-header">Alerts</div>
      <div className="card-body">
        <p className="card-text">
          Your email was involved in a breach on the following sites:
          <br />
        </p>
        <ul className="list-group list-group-flush mb-3">
          {props.breaches.map((breach) => (
            <li key={breach.name} className="list-group-item bg-warning">
              -{" "}
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(breach.addedDate))}{" "}
              – {breach.name}
            </li>
          ))}
        </ul>
        <p className="card-text">
          Although your information on our site is safe, we recommend you change
          your password in case your AppCo account shares a password with any of
          the sites above.
          <br />
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-info">Change password</button>
          <button className="btn btn-light" onClick={props.onDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
