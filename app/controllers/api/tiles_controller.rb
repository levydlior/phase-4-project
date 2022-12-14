class Api::TilesController < ApplicationController


    def create
        city = City.find_or_create_by(tile_params)
        tile = Tile.create!(user_id: current_user, city_id: city.id)
        render json: tile.city, status: :created
    end


    def destroy
        tile = Tile.find_by(user_id: current_user, city_id: params[:id])
        city = tile.city
        tile.destroy
       
        if city.tiles.length == 0
            city.destroy
        else
            nil
        end
       
        render json: city
    end
     
    private

    def current_user
        session[:user_id]
    end

    def tile_params
        params.permit(:name)
    end
    
end
