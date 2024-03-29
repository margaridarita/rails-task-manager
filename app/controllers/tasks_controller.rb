class TasksController < ApplicationController
  protect_from_forgery with: :exception
  before_action :set_task, only: %i[show edit update destroy]

  def index
    @tasks = Task.where(completed: false)
  end

  def show
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to task_path(@task)
    else
      render 'new'
    end
  end

  def new
    @task = Task.new
  end

  def edit
  end

  def update
    @task.update(task_params)
    redirect_to tasks_path
  end

  def destroy
    @task.destroy
    redirect_to tasks_path
  end

  def bulk_update
    @completed_tasks = Task.where(id: params.fetch(:task_ids, []).compact)
    if params[:commit] == 'Complete'
      @completed_tasks.update_all(completed: true)
    end
    redirect_to action: :index
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :details, :completed)
  end
end
