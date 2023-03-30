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
    // const isChecked = Array.from(this.checkboxTargets).some(checkbox => checkbox.checked);
    // this.buttonTarget.classList.toggle('d-none', !isChecked);
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
      this.buttonTarget.classList.add('d-none')
    };
  }

  complete() {
    const url = "/tasks/destroy_checked_tasks";
    const data = { task_ids: this.checkedTasks };

    fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		}).then(() => {
			window.location.reload();
		});
  }
}

  // complete() {
  //   this.checkboxTargets.forEach(checkbox => {
  //     if (checkbox.checked) {
  //       const taskId = checkbox.id.split('-')[1]; // ['task', '22']
  //       const url = `/tasks/${taskId}/toggle_completed`;

  //       fetch(url, { method: 'POST'})
  //         .then(response => response.json())
  //         .then(data => {
  //           checkbox.checked = data.completed;
  //         })
  //     }
  //   })

  //   location.reload();
  // }
