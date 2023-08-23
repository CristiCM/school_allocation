class Assignment < ApplicationRecord
  belongs_to :user
  belongs_to :school_specialization

  after_create :decrement_spot
  after_destroy :increment_spot

  private

  def decrement_spot
    school_specialization.decrement!(:spots_available)
  end

  def increment_spot
    school_specialization.increment!(:spots_available)
  end
end
