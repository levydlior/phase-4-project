class Api::CitiesController < ApplicationController

  # GET /cities
  def index
    render json: User.find(session[:user_id]).cities
  end

  # GET /cities/1
  def show
    render json: @city
    # city = User.find(session[:user_id]).cities
    # render json: city[params[:id].to_i]
  end

  # POST /cities
  def create
    city = City.create!(city_params)
    render json: city, status: :created
  end

  # DELETE /cities/1
  def destroy
    @city.destroy
    head :no_content
  end

  private
   
    def set_city
      @city = City.find(params[:id])
    end


    def city_params
      params.permit(:name)
    end
end
