import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox", "button"]

  connect() {
    console.log("Marga is here");
    console.log(this.checkboxTargets);
  }

  check() {
    const isChecked = Array.from(this.checkboxTargets).some(checkbox => checkbox.checked);
    this.buttonTarget.classList.toggle('d-none', !isChecked);
  }

  complete() {
    this.checkboxTargets.forEach(checkbox => {
      if (checkbox.checked) {
        const taskId = checkbox.id.split('-')[1]; // ['task', '22']
        const url = `/tasks/${taskId}/toggle_completed`;

        fetch(url, { method: 'POST'})
          .then(response => response.json())
          .then(data => {
            checkbox.checked = data.completed;
          })
      }
    })

    location.reload();
  }
}
