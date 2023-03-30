class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy, :destroy_checked_tasks]

  def index
    @tasks = Task.all
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

  # def toggle_completed
  #   raise
  #   @task.update(completed: !@task.completed)
  #   render json: { completed: @task.completed }
  # end

  def destroy_checked_tasks
    raise
    Task.where(id: params[:task_ids]).destroy_all
    redirect_to tasks_path, status: :see_other
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :details, :completed)
  end

end
