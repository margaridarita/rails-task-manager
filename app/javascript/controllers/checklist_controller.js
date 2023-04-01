import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox", "button"]

  connect() {
		console.log("Marga is here");
		console.log(this.checkboxTargets);
		this.checkedTasks = [];
	}

  check(event) {
    console.dir(event);
    const checkbox = event.target;
    const taskId = checkbox.value;
    console.log(taskId);

    if (checkbox.checked) {
      this.checkedTasks.push(taskId)
    } else {
      this.checkedTasks = this.checkedTasks.filter((id) => id !== taskId)
    };

    console.log(this.checkedTasks);

    if (this.checkedTasks.length > 0) {
      this.buttonTarget.classList.remove('d-none');
    } else {
      this.buttonTarget.classList.add('d-none');
    };
  }

}
