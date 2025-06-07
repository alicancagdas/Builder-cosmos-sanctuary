#!/bin/bash

# Start supervisor to manage all services
exec /usr/bin/supervisord -c /etc/supervisord.conf
