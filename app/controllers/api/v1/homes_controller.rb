class Api::V1::HomesController < ApplicationController
  def new
    @users = User.first(50)

    render json: @users
  end
end
