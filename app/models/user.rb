class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  
  has_many :preferences, dependent: :destroy
  has_one :assignment, dependent: :destroy
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :email, presence: true, uniqueness: true
  validates :admission_average, :en_average, :ro_grade, :mathematics_grade, :graduation_average, presence: true, if: :student?

  def jwt_payload
    super
  end

  def student?
    role == 'student'
  end
  
  # Arel -> SQL AST (Abstract Syntax Tree) manager for Ruby.
  # Allows you to generate SQL queries programmatically and is used internally by ActiveRecord (the default ORM in Rails) to build queries.
  def self.get_allocation_sorted_student_ids
    User.select("
        users.*,
        0.2 * graduation_average + 0.8 * admission_average AS weighted_average,
        CASE 
          WHEN mother_tongue IS NOT NULL AND mother_tongue_grade IS NOT NULL THEN mother_tongue_grade
          ELSE 0 
        END AS mother_tongue_tiebreaker
      ")
      .where(role: 'student')
      .order(
        Arel.sql('weighted_average DESC, 
                  admission_average DESC, 
                  graduation_average DESC, 
                  ro_grade DESC, 
                  mathematics_grade DESC, 
                  mother_tongue_tiebreaker DESC')
      ).map(&:id)
  end
  
  def self.students_without_preferences
    left_joins(:preferences)
      .where(role: 'student')
      .where(preferences: { id: nil })
  end
end
