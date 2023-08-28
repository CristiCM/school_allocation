class Api::V1::HomesController < ApplicationController
  def new
    @users = User.first(2)

    render json: @users
  end
end
