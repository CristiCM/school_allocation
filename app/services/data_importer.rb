class DataImporter

    def initialize(file)
        @file = file
    end

    def call
        raise "Not a CSV file" if File.extname(@file.path) != '.csv'
  
        spreadsheet = Roo::Spreadsheet.open(@file.path)
        header = spreadsheet.row(1)
  
        raise "Invalid headers" unless header.sort == ["school", "track", "specialization"].sort
  
        School.import(@file, 'school')
        Track.import(@file, 'track')
        Specialization.import(@file, 'specialization')
    end
end