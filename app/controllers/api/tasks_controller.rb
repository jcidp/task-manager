class Api::TasksController < ApplicationController
  def index
    tasks = Current.user.tasks
    render json: tasks
  end

  def summary
    tasks = Current.user.tasks.summary
    render json: tasks
  end

  def create
    user = Current.user
    task = user.tasks.build(user_params)
    if task.save
      render json: task
    else
      render json: { message: "Invalid task" }, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update(user_params)
      render json: task, status: :ok
    else
      render json: { message: "Invalid task" }, status: :unprocessable_entity
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: { message: "Success" }, status: :ok
  end

  private
  def user_params
    params.require(:task).permit(:title, :description, :due_date, :urgent, :important, :done)
  end
end
