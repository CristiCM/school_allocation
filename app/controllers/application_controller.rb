class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    rescue_from CanCan::AccessDenied do |exception|
        render_error("You don't have access on this page!", :forbidden)
    end  
    
    protected

    def render_success(message = "Success", status = :ok, data_structure = {})
        render json: {
          status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message},
          data: data_structure
        }, status: status
    end
      
  
    def render_error(message = "Error", status = :bad_request)
      render json: {
        status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message}
      }, status: status
    end

    def set_job
      @job = Job.first
      unless @job
        render_error("Job record does not exist", :not_found)
        return
      end
    end
end



# 2xx (Successful responses):

# :ok – 200 OK
# :created – 201 Created
# :accepted – 202 Accepted
# :non_authoritative_information – 203 Non-Authoritative Information
# :no_content – 204 No Content
# :reset_content – 205 Reset Content
# :partial_content – 206 Partial Content
# 3xx (Redirection):

# :multiple_choices – 300 Multiple Choices
# :moved_permanently – 301 Moved Permanently
# :found – 302 Found
# :see_other – 303 See Other
# :not_modified – 304 Not Modified
# :use_proxy – 305 Use Proxy
# :temporary_redirect – 307 Temporary Redirect
# 4xx (Client errors):

# :bad_request – 400 Bad Request
# :unauthorized – 401 Unauthorized
# :payment_required – 402 Payment Required
# :forbidden – 403 Forbidden
# :not_found – 404 Not Found
# :method_not_allowed – 405 Method Not Allowed
# :not_acceptable – 406 Not Acceptable
# :proxy_authentication_required – 407 Proxy Authentication Required
# :request_timeout – 408 Request Timeout
# :conflict – 409 Conflict
# :gone – 410 Gone
# :length_required – 411 Length Required
# :unprocessable_entity – 422 Unprocessable Entity
# :locked – 423 Locked
# :failed_dependency – 424 Failed Dependency
# :too_many_requests – 429 Too Many Requests
# 5xx (Server errors):

# :internal_server_error – 500 Internal Server Error
# :not_implemented – 501 Not Implemented
# :bad_gateway – 502 Bad Gateway
# :service_unavailable – 503 Service Unavailable
# :gateway_timeout – 504 Gateway Timeout
# :http_version_not_supported – 505 HTTP Version Not Supported
# :insufficient_storage – 507 Insufficient Storage
# :loop_detected – 508 Loop Detected
# :bandwidth_limit_exceeded – 509 Bandwidth Limit 