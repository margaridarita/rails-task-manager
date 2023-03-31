import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox", "button"]

  connect() {
		console.log("Marga is here");
		console.log(this.checkboxTargets);
		this.checkedTasks = [];
	}

  check(event) {
    console.dir(event.target);
    const checkbox = event.target;
    const taskId = checkbox.id.split("-").pop();

    if (checkbox.checked) {
      this.checkedTasks.push(taskId)
    } else {
      this.checkedTasks = this.checkedTasks.filter((id) => id !== taskId)
    };

    console.log("checkedTasks", this.checkedTasks);
    if (this.checkedTasks.length > 0) {
      this.buttonTarget.classList.remove('d-none');
    } else {
      this.buttonTarget.classList.add('d-none');
    };
  }

  complete() {
    const ids = this.checkedTasks;
    console.log('ids:', ids);
    fetch('/delete_ids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_ids: ids })
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }
}
