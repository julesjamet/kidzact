class KidsController < ApplicationController

    def index
        @kids = Kid.all
    end

    def dashboard
    end

    def show
        @kid = Kid.find(params[:id])
        puts "-------------"
        array = JSON.parse(@kid.languages)
        array.each { |lang| puts lang.values}
        
        puts "-------------"
    end

    def new
        @kid = Kid.new
    end

    def create
        @kid = Kid.new(kid_params)
        @kid.save
        redirect_to kid_path(@kid)
    end

    def edit
        @kid = Kid.find(params[:id])
    end

    def update
        @kid = Kid.find(params[:id])
        @kid.update(kid_params)
    
        # no need for app/views/kids/update.html.erb
        redirect_to kid_path(@kid)
    end

    def destroy
        @kid = kid.find(params[:id])
        @kid.destroy
    
        # no need for app/views/kids/destroy.html.erb
        redirect_to kids_path
    end

    private

    def kid_params
        params.require(:kid).permit(:name, :age, :school, :image, :desc, :languages, :sports, :places, :interests)
    end
end
