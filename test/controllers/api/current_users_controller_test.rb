require "test_helper"

class Api::CurrentUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user, @token = sign_in_as(users(:lazaro_nixon))
  end

  def default_headers
    { "Authorization" => "Bearer #{@token}" }
  end

  test "should get show" do
    get api_me_url, headers: default_headers
    assert_response :success
  end
end
