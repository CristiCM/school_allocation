class SchoolSpecialization < ApplicationRecord
  has_many :assignments
  has_many :preferences
  belongs_to :school
  belongs_to :track
  belongs_to :specialization

  validates :school_id, :track_id, :specialization_id, presence: true
  validates :spots_available, presence: true, numericality: { greater_than: 0, only_integer: true }

  def display_name
    "#{School.find(school_id).name}\t\t\t|\t\t\t#{Track.find(track_id).name}\t\t\t|\t\t\t#{Specialization.find(specialization_id).name}"
  end
  def display_school
    "#{School.find(school_id).name}"
  end
  def display_track
    "#{Track.find(track_id).name}"
  end
  def display_specialization
    "#{Specialization.find(specialization_id).name}"
  end
end
