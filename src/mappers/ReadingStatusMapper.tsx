
import { ReadingStatus } from "../types/ReadingStatus.type";

class ReadingStatusMapper {

    private readingStatusOptions: string[] = ['Read', 'Unread', 'In Progress']
    
    private stringToReadingStatus = (string: string): ReadingStatus => {
        switch (string) {
            case 'Read':
                return ReadingStatus.Read;
            case 'Unread':
                return ReadingStatus.Unread
            case 'In Progress':
                return ReadingStatus.InProgress;
            default:
                return ReadingStatus.Read;
        }
    };

    private readingStatusToString = (readingStatus: ReadingStatus): string => {
        switch (readingStatus) {
            case ReadingStatus.Read:
                return 'Read';
            case ReadingStatus.Unread:
                return 'Unread';
            case ReadingStatus.InProgress:
                return 'In Progress';
            default:
                return 'Read';
        }
    }

  mapStringToReadingStatus(string: string): ReadingStatus {
    return this.stringToReadingStatus(string) || ReadingStatus.Read;
  }

  mapReadingStatusToString(readingStatus: ReadingStatus): string {
    return this.readingStatusToString(readingStatus) || 'Read';
  }

  getAllReadingStatusOptions(): string[] {
    return this.readingStatusOptions;
  }
}

export default ReadingStatusMapper;