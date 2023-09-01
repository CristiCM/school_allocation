class SchoolSpecializationSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :school_id, :track_id, :specialization_id, :spots_available, :created_at
end

#   We can access serializer data for single record by,
#   UserSerializer.new(resource).serializable_hash[:data][:attributes]
#   And multiple records by,
#   UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}