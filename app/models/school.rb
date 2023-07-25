class School < ApplicationRecord
    def self.import(file)
        spreadsheet = Roo::Spreadsheet.open(file.path)
        header = spreadsheet.row(1)
        (2..spreadsheet.last_row).each do |i|
          row = Hash[[header, spreadsheet.row(i)].transpose]
          self.find_or_create_by(name: row["school"])
        end
    end
end
  