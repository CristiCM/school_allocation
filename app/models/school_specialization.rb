class SchoolSpecialization < ApplicationRecord
  belongs_to :school
  belongs_to :track
  belongs_to :specialization

  validates :school_id, :track_id, :specialization_id, presence: true
  validates :spots_available, presence: true, numericality: { greater_than: 0, only_integer: true }

  def display_name
    "#{School.find(school_id).name}\t|\t
     #{Track.find(track_id).name}\t|\t
     #{Specialization.find(specialization_id).name}"
  end
end
