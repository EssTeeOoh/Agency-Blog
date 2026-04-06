from rest_framework.throttling import AnonRateThrottle

class SubscribeRateThrottle(AnonRateThrottle):
    rate = '4/hour'        # Max 4 attempts per hour per IP
    