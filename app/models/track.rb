class Track < ApplicationRecord  
  has_many :school_specializations
  include Importable
end
