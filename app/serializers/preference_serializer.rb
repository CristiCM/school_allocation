class PreferenceSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :user_id, :school_specialization_id, :priority, :created_at
end

#   We can access serializer data for single record by,
#   UserSerializer.new(resource).serializable_hash[:data][:attributes]
#   And multiple records by,
#   UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}