class DataImporter

    def initialize(file)
        @file = file
    end

    def import_csv
        raise "The file is not in the correct format (.csv)." if File.extname(@file.path) != '.csv'
  
        spreadsheet = Roo::Spreadsheet.open(@file.path)
        header = spreadsheet.row(1)
  
        raise "Invalid spreadsheet headers." unless header.sort == ["school", "track", "specialization"].sort
  
        School.import(@file, 'school')
        Track.import(@file, 'track')
        Specialization.import(@file, 'specialization')
    end
end