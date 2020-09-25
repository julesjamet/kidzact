class KidsController < ApplicationController

    def index
        @kids = Kid.all
    end

    def new
        @kid = Kid.new
    end

    def create
        @kid = Kid.new(restaurant_params)
        @kid.save
        redirect_to kid_path(@kid)
    end

    def destroy
        @kid = kid.find(params[:id])
        @kid.destroy
    
        # no need for app/views/kids/destroy.html.erb
        redirect_to kids_path
    end

    private

    def restaurant_params
        params.require(:kid).permit(:name, :age, :school)
    end
end
