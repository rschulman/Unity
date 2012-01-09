class SystemsController < ApplicationController
  
  respond_to :xml
  
  def show
    @our_system = System.find(params[:id])
    respond_with(@our_system) do |format|
      format.xml
    end
  end
end