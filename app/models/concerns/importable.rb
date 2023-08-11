module Importable
    extend ActiveSupport::Concern
  
    class_methods do
      def import(file, column_name)
        spreadsheet = Roo::Spreadsheet.open(file.path)
        header = spreadsheet.row(1)
        (2..spreadsheet.last_row).each do |i|
          row = Hash[[header, spreadsheet.row(i)].transpose]
          self.find_or_create_by(name: row[column_name])
        end
      end
    end
  end