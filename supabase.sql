-- Таблица бронирований
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INT NOT NULL CHECK (guests_count > 0),
  comment TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out) WHERE status = 'confirmed';
CREATE INDEX idx_bookings_status ON bookings(status);

-- RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Публичный SELECT только подтверждённых (для календаря)
CREATE POLICY "Public can read confirmed bookings"
  ON bookings FOR SELECT
  USING (status = 'confirmed');

-- Публичный INSERT (форма создаёт pending)
CREATE POLICY "Public can create pending bookings"
  ON bookings FOR INSERT
  WITH CHECK (status = 'pending');

-- Защита: при INSERT нельзя создать на занятые даты
CREATE OR REPLACE FUNCTION check_booking_overlap()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM bookings
    WHERE status = 'confirmed'
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      AND (NEW.check_in, NEW.check_out) OVERLAPS (check_in, check_out)
  ) THEN
    RAISE EXCEPTION 'Эти даты уже заняты';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_double_booking
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION check_booking_overlap();
