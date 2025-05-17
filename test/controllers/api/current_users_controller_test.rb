require "test_helper"

class Api::CurrentUsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_current_users_show_url
    assert_response :success
  end
end
