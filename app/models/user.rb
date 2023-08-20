class User < ApplicationRecord
  has_many :preferences
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :email, presence: true, uniqueness: true
  validates :admission_average, :en_average, :ro_grade, :mathematics_grade, :graduation_average, presence: true, if: :student?

  def student?
    role == 'student'
  end
  
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
  
  # Arel -> SQL AST (Abstract Syntax Tree) manager for Ruby.
  # Allows you to generate SQL queries programmatically and is used internally by ActiveRecord (the default ORM in Rails) to build queries.
end
