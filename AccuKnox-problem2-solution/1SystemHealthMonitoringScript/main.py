import psutil
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    filename="system_health.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Thresholds
CPU_THRESHOLD = 80        # percent
MEMORY_THRESHOLD = 80     # percent
DISK_THRESHOLD = 90       # percent
PROCESS_THRESHOLD = 300   # number of processes

def log_warning(message):
    print(f"[WARNING] {message}")
    logging.warning(message)

def check_cpu():
    cpu_usage = psutil.cpu_percent(interval=1)
    if cpu_usage > CPU_THRESHOLD:
        log_warning(f"High CPU usage detected: {cpu_usage}%")
    return cpu_usage

def check_memory():
    memory = psutil.virtual_memory()
    if memory.percent > MEMORY_THRESHOLD:
        log_warning(f"High Memory usage detected: {memory.percent}%")
    return memory.percent

def check_disk():
    disk = psutil.disk_usage('/')
    if disk.percent > DISK_THRESHOLD:
        log_warning(f"Low Disk Space! Usage: {disk.percent}%")
    return disk.percent

def check_processes():
    process_count = len(psutil.pids())
    if process_count > PROCESS_THRESHOLD:
        log_warning(f"Too many running processes: {process_count}")
    return process_count

def main():
    print("Running System Health Check...\n")
    cpu = check_cpu()
    mem = check_memory()
    disk = check_disk()
    procs = check_processes()

    logging.info(f"CPU: {cpu}%, Memory: {mem}%, Disk: {disk}%, Processes: {procs}")

if __name__ == "__main__":
    main()