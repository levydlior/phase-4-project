class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end
  
    def show
      user = User.find_by(id: session[:user_id])
      render json: user, status: :ok
    end

    def update
      user = User.find_by_id(session[:user_id])
      user.update!(user_params)
    end
  
    private
  
    def user_params
      params.permit(:username, :password)
    end
end
