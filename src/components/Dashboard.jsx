import React from "react";
import TasksCard from './cards/TasksCard'
import BreachAlertCard from './cards/BreachAlertCard'

export default function Dashboard(props) {
  
  return (
    <div>
      <h2 className="mt-3">Dashboard</h2>
      <div className="row mt-5">
        <div className="col-12">
          <TasksCard />
          <BreachAlertCard
            suggestPasswordChange={props.suggestPasswordChange}
            breaches={props.breaches}
            onDismiss={props.onDismissBreachAlert}
            />
        </div>
      </div>
    </div>
  );
}
