# Changelog

All notable changes to **LíLẽ** are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: 4-digit MAJOR.MINOR.PATCH.MICRO.

## [Unreleased]

### Changed

- Đổi tên site từ PhysicsFriend thành LíLẽ: repo `tiennm99dev/lile`, địa chỉ mới `https://tiennm99dev.github.io/lile/`. Các site anh em cũng đổi sang tên tiếng Việt: MathMate thành ToánTốt, AlgorithmAlly thành TinTưởng, ChemCoach thành HoáHợp, BioBuddy thành SinhSôi. Tiến độ "đã làm" lưu trong trình duyệt dưới cả hai tên cũ (PhysMax và PhysicsFriend) được chuyển sang tên mới ở lần mở bài đầu tiên.
- Đổi tên site từ PhysMax thành PhysicsFriend: repo `tiennm99dev/physicsfriend`, địa chỉ mới `https://tiennm99dev.github.io/physicsfriend/`. Các site anh em cũng đổi tên: MathMax thành MathMate, AlgoAtlas thành AlgorithmAlly, ChemMax thành ChemCoach, BioMax thành BioBuddy. Tiến độ "đã làm" lưu trong trình duyệt dưới tên cũ được chuyển sang tên mới ở lần mở bài đầu tiên.

## [0.0.1.0] - 2026-10-25

### Added

- Site Vật lí lớp 6-12 theo KNTT, dựng trên phần lõi đồng bộ từ MathMax: trang chọn lớp, hub lớp, chương, mạch kiến thức và trang "Sắp ra mắt" cho 189 bài trong 44 chương.
- Chương trình học `lop-6.json` … `lop-12.json` nhập từ manifest Vật lí (KHTN 6-9 mạch Vật lí, Vật lí 10-12 và Chuyên đề học tập).
- Thành phần Vật lí trong `src/lib/domain/`: `vector-field`, `force-diagram`, `motion-plot`, `circuit-board`, `ray-optics-bench`, `wave-plot`, `thermometer`, mỗi thành phần có engine thuần kèm test và demo ở `/_gallery/`.
- Bài mẫu Lớp 10 — Bài 1. Làm quen với Vật lí: thí nghiệm máng nghiêng của Galilei để kiểm tra giả thuyết, dòng thời gian các cuộc cách mạng công nghiệp.
- Apache-2.0 LICENSE, README, RUNBOOK; CI và deploy GitHub Pages từ `main`.
