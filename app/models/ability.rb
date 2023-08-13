class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    if user.role == 'admin'
      can :manage, :all
      cannot :manage, Preference
    elsif user.role == 'student'
      can :manage, Preference
      can :read, :pages
    else
      can :read, :pages
    end
  end
end


# You can single out one method and use custom auth.
# Instead of load_and_authorize_resource you need to go for authorize_resources.

# can :action_name, some_Model

# authorize! :action_name, some_Model  in controller

# When multiple user resources are shown and you want them to interact only with 
# the ones created by them you need to specify that as:

# can :update, Article do |article|
#   article.user == user
# end