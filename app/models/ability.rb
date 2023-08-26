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