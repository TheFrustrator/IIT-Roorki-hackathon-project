import argparse
# Add this at the beginning of the Python script
parser = argparse.ArgumentParser(description="Synchronize subtitles with video")
parser.add_argument("--video", required=True, help="Path to the video file")
parser.add_argument("--subtitle", required=True, help="Path to the subtitle file")
parser.add_argument("--output", required=True, help="Path to save the corrected subtitle file")
args = parser.parse_args()

# Replace hardcoded paths with args.video, args.subtitle, and args.output
