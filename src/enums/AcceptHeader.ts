/**
 * @see The [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
 */
export enum AcceptHeader {
    // Miscellaneous
    ALL = "*/*",
    OCTET = "application/octet-stream",
    PLAIN = "text/plain",
    
    // Text
    CSS = "text/css",
    CSV = "text/csv",
    HTML = "text/html",
    ICS = "text/calendar",
    JS = "text/javascript",
    MJS = "text/javascript",
    TXT = "text/plain",
    
    // Audio
    AAC = "audio/aac",
    MID = "audio/midi",
    MIDI = "audio/x-midi",
    MP3 = "audio/mpeg",
    OGG = "audio/ogg",
    OPUS = "audio/opus",
    WAV = "audio/wav",
    WEBA = "audio/webm",
    AUDIO_3GP = "audio/3gpp",
    AUDIO_3G2 = "audio/3gpp2",

    // Video
    AVI = "video/x-msvideo",
    MP4 = "video/mp4",
    MPEG = "video/mpeg",
    OGV = "video/ogg",
    TS = "video/mp2t",
    WEBM = "video/webm",
    VIDEO_3GP = "video/3gpp",
    VIDEO_3G2 = "video/3gpp2",

    // Image
    BMP = "image/bmp",
    GIF = "image/gif",
    ICO = "image/vnd.microsoft.icon",
    JPEG = "image/jpeg",
    JPG = "image/jpeg",
    PNG = "image/png",
    SVG = "image/svg+xml",
    TIF = "image/tiff",
    TIFF = "image/tiff",
    WEBP = "image/webp",

    // Font
    OTF = "font/otf",
    TFF = "font/ttf",
    WOFF = "font/woff",
    WOFF2 = "font/woff2",

    // Application
    ABW = "application/x-abiword",
    ARC = "application/x-freearc",
    AZW = "application/vnd.amazon.ebook",
    BIN = "application/octet-stream",
    BZ = "application/x-bzip",
    BZ2 = "application/x-bzip2",
    CDA = "application/x-cdf",
    CSH = "application/x-csh",
    DOC = "application/msword",
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    EOT = "application/vnd.ms-fontobject",
    EPUB = "application/epub+zip",
    GZ = "application/gzip",
    JAR = "application/java-archive",
    JSON = "application/json",
    JSONLD = "application/ld+json",
    MPKG = "application/vnd.apple.installer+xml",
    ODP = "application/vnd.oasis.opendocument.presentation",
    ODS = "application/vnd.oasis.opendocument.spreadsheet",
    ODT = "application/vnd.oasis.opendocument.text",
    OGX = "application/ogg",
    PDF = "application/pdf",
    PHP = "application/x-httpd-php",
    PPT = "application/vnd.ms-powerpoint",
    PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    RAR = "application/vnd.rar",
    RTF = "application/rtf",
    SH = "application/x-sh",
    SWF = "application/x-shockwave-flash",
    TAR = "application/x-tar",
    VSD = "application/vnd.visio",
    XHTML = "application/xhtml+xml",
    XLS = "application/vnd.ms-excel",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    XML = "application/xml",
    XUL = "application/vnd.mozilla.xul+xml",
    ZIP = "application/zip",
    APPLICATION_7Z = "application/x-7z-compressed"
}