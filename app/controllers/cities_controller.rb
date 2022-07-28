class CitiesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :destory]

  # GET /cities
  def index
    cities = City.all

    render json: cities
  end

  # GET /cities/1
  def show
    render json: @city
  end

  # POST /cities
  def create
    @city = City.create!(city_params)
  
    render json: @city, status: :created, location: @city
    
  end

  # DELETE /cities/1
  def destroy
    @city.destroy
  end

  private
   
    def set_city
      @city = City.find(params[:id])
    end


    def city_params
      params.permit(:name)
    end
end
