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
      can :all_specializations, :schools_creation_controller 
      can :new, :schools_creation_controller
    else
      can :read, :pages
    end
  end
end