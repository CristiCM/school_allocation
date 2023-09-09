require 'rails_helper'

RSpec.describe "JWT Authentication Flow", type: :request do
  let(:user) { create(:user, password: "password123", password_confirmation: "password123", role: 'admin') }

  describe "JWT refresh flow" do
    it "refreshes the JWT token after sign in" do
        # 1: Sign in and get a jwt token in header and a refresh token in the body.
        post "/users/sign_in", params: { user: { email: user.email, password: "password123" } }
        expect(response).to have_http_status(:success)

        parsed_response = JSON.parse(response.body)
        jwt_token = response.headers["Authorization"].split.last
        refresh_token = parsed_response["data"]["refresh_token"]

        # 2: Refresh the jwt using the refresh token and receive the new jwt in body response.
        post "/refresh_jwt", headers: { "RefreshToken" => refresh_token }
        expect(response).to have_http_status(:success)

        parsed_response = JSON.parse(response.body)
        new_jwt_token = parsed_response["data"]["new_jwt_token"]
        expect(new_jwt_token).not_to eq(jwt_token)

        # 3: Call a random route that needs jwt access.
        routes = ['/assignments/new', '/assignments', '/students', '/school_specializations']

        get routes[rand(4)], headers: { "Authorization" => new_jwt_token}
        expect(response).to have_http_status(:success)
    end
  end
end
