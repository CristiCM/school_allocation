class TrackSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :created_at
end

#   We can access serializer data for single record by,
#   UserSerializer.new(resource).serializable_hash[:data][:attributes]
#   And multiple records by,
#   UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}